#!/bin/bash

set -e
# Load environment variables from .env file
if [ -f ".env" ]; then
  echo "🔍 Loading environment variables from .env"
  set -a
  source .env
  set +a
else
  echo "⚠️ No .env file found, using default environment variables or CLI variables"
fi

mkdir -p results

run_all="${RUN_ALL:-1}"
test_file_env="${TEST_FILE:-}"
dashboardOption="${GENERATE_DASHBOARD:-0}"

test_files=()

if [ "$run_all" == "1" ]; then
  test_files=(./k6-tests/tests/*.js)
elif [ "$run_all" == "0" ]; then
  if [ -z "$test_file_env" ]; then
    echo "❌ TEST_FILE environment variable not found."
    exit 1
  elif [ ! -f "$test_file_env" ]; then
    echo "❌ File doesn't exist: $test_file_env"
    exit 1
  else
    test_files=("$test_file_env")
  fi
else
  echo "❌ RUN_ALL invalid variable."
  exit 1
fi

generate_dashboard=false
if [ "$dashboardOption" == "1" ]; then
  generate_dashboard=true
elif [ "$dashboardOption" != "0" ]; then
  echo "❌ Invalid option, aborting operation..."
  exit 1
fi


for test_file in "${test_files[@]}"; do
  test_name=$(basename "$test_file" .js)
  echo "🚀 Running $test_name"

  if [ "$generate_dashboard" = true  ]; then
    timestamp=$(date +"%Y%m%d-%H%M%S")
    html_report="results/report-${test_name}-${timestamp}.html"
    echo "🧪 Executing: K6_WEB_DASHBOARD_EXPORT=$html_report k6 run $test_file"
    K6_WEB_DASHBOARD=true \
    K6_WEB_DASHBOARD_OPEN=false \
    K6_WEB_DASHBOARD_EXPORT="$html_report" \
    k6 run "$test_file"
  else
    echo "🧪 Executing without dashboard: $test_file"
    k6 run "$test_file"
  fi
  echo "✅ Finished $test_name"
done


echo ""
echo "✅ All test executions completed."
[ "$generate_dashboard" = true ] && echo "📄 HTML reports saved in: results/report-*.html"
exit 0

