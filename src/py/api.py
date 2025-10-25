from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import json

app = Flask(__name__)
CORS(app)

# مسیر اجرای Sherlock CLI (در ویندوز از 'py -m sherlock_project' استفاده می‌کنیم)
SHERLOCK_CMD_BASE = ["py", "-m", "sherlock_project"]
WEBSITES_JSON = os.path.join(os.path.dirname(__file__), "sherlock_project", "allSite.json")

@app.route("/sites/list", methods=["GET"])
def get_sites():
    """
    بازگرداندن لیست اسامی سایت‌های پشتیبانی‌شده
    """
    if not os.path.exists(WEBSITES_JSON):
        return jsonify({"error": "allSite.json not found"}), 404

    with open(WEBSITES_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    # حذف $schema (اگر وجود داشت)
    site_names = [key for key in data.keys() if key != "$schema"]

    site_names.sort()
    return jsonify({"sites": site_names})

@app.route("/scan", methods=["POST"])
def scan():
    data = request.get_json() or {}
    username = data.get("username")
    sites = data.get("sites")       # می‌تواند لیست (["twitter","github"]) یا رشته "twitter,github" باشد
    timeout = data.get("timeout", 120)  # ثانیه، اختیاری (پیش‌فرض 120s)

    if not username:
        return jsonify({"error": "username is required"}), 400

    # ساخت آرگومان‌های دستور
    # ساخت دستور
    cmd = SHERLOCK_CMD_BASE.copy()
    cmd.append(username)

    site_list = []
    if sites:
        if isinstance(sites, str):
            site_list = [s.strip() for s in sites.split(",") if s.strip()]
        elif isinstance(sites, list):
            site_list = [str(s).strip() for s in sites if str(s).strip()]

        # هر سایت یک --site اضافه می‌کنیم
        for site in site_list:
            cmd += ["--site", site]

    cmd += ["--print-found", "--no-color"]


    try:
        # اجرای دستور به صورت امن (بدون shell=True)
        result = subprocess.check_output(
            cmd,
            stderr=subprocess.STDOUT,
            text=True,
            timeout=int(timeout)
        )

        # تبدیل خروجی به لیست خطوط غیرخالی
        lines = [line for line in result.splitlines() if line.strip()]

        return jsonify({
            "username": username,
            "sites_requested": site_list if sites else "all",
            "results": lines
        })
    except subprocess.TimeoutExpired as e:
        return jsonify({"error": "timeout", "details": str(e)}), 504
    except subprocess.CalledProcessError as e:
        # خطای اجرای sherlock (مثلاً سایت پاسخ نداده یا خطای داخلی)
        output = e.output or ""
        return jsonify({"error": "sherlock error", "details": output}), 500
    except Exception as e:
        return jsonify({"error": "internal server error", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
