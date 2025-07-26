#!/bin/bash

set -e

mkdir -p results

echo "🔍 Do you want to run all tests or only one?"
echo "1 - All tests"
echo "2 - Only one"
read -p "Select (1 or 2): " escolha

test_files=()

if [ "$escolha" == "1" ]; then
  test_files=(./k6-tests/tests/*.js)
elif [ "$escolha" == "2" ]; then
  echo "📄 Tests available:"
  select selected_file in ./k6-tests/tests/*.js; do
    if [ -n "$selected_file" ]; then
      test_files=("$selected_file")
      break
    else
      echo "❌ Invalid option, try again."
    fi
  done
else
  echo "❌ Invalid option."
  exit 1
fi



echo "📊 Do you want to generate an HTML dashboard report?"
echo "1 - Yes"
echo "2 - No"
read -p "Select (1 or 2): " dashboardOption

generate_dashboard=false
if [ "$dashboardOption" == "1" ]; then
  generate_dashboard=true
elif [ "$dashboardOption" != "2" ]; then
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

