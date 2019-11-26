#!/bin/bash

function check_exit_code {
  # $1 = Exit code
  # $2 = Operation
  # $3 = Project
  if [[ -n $1 ]] && [[ $1 -gt 0 ]]
  then
    echo "@fox/$3 $2 failed with exit code $1"
    echo "Printing log of failed run"
    cat "./logs/$2-$3.log"
  else
    echo "@fox/$3 $2 completed successfully"
  fi
}

function exit_on_job_failure {
  # $1 = List of exit codes
  # $2 = List of PIDs
  for exit_code in $1
  do
    if [[ ${exit_code} -gt 0 ]]
    then
      kill $2 2> /dev/null
      echo "Exiting due to job failures"
      exit 1
    fi
  done
}

#npm config set fetch-retries 5
#NODE_EXTRA_CA_CERTS=`pwd`/UHG_Certificates.pem
#npm install
#cd node_modules/puppeteer/.local-chromium || exit
#WORKING_DIR=`pwd`
#CHROME_BIN=`find $WORKING_DIR -name "[Cc]hromium"`
#export CHROME_BIN
#cd ../../..

rm ./logs/*.log
# Building Layer 1: No pre-requisites
# - Linting - Could check this earlier (fail fast) or later (get as many failures as possible sooner, but longer to fail the build)
echo "$(ng l state-management > ./logs/lint-state-management.log 2>&1 ; echo $?)" > EC_LINT_STATE_MANAGEMENT.var &
PID_LINT_STATE_MANAGEMENT=$!
echo "Linting @fox/state-management"
echo "$(ng l rest-clients > ./logs/lint-rest-clients.log 2>&1 ; echo $?)" > EC_LINT_REST_CLIENTS.var &
PID_LINT_REST_CLIENTS=$!
echo "Linting @fox/rest-clients"
echo "$(ng l test-support > ./logs/lint-test-support.log 2>&1 ; echo $?)" > EC_LINT_TEST_SUPPORT.var &
PID_LINT_TEST_SUPPORT=$!
echo "Linting @fox/test-support"
echo "$(ng l login > ./logs/lint-login.log 2>&1 ; echo $?)" > EC_LINT_LOGIN.var &
PID_LINT_LOGIN=$!
echo "Linting @fox/login"
echo "$(ng l file-maintenance > ./logs/lint-file-maintenance.log 2>&1 ; echo $?)" > EC_LINT_FILE_MAINTENANCE.var &
PID_LINT_FILE_MAINTENANCE=$!
echo "Linting @fox/file-maintenance"
echo "$(ng l claim-pdf > ./logs/lint-claim-pdf.log 2>&1 ; echo $?)" > EC_LINT_CLAIM_PDF.var &
PID_LINT_CLAIM_PDF=$!
echo "Linting @fox/claim-pdf"
echo "$(ng l eob-material-pdf > ./logs/lint-eob-material-pdf.log 2>&1 ; echo $?)" > EC_LINT_EOB_MATERIAL_PDF.var &
PID_LINT_EOB_MATERIAL_PDF=$!
echo "Linting @fox/eob-material-pdf"
echo "$(ng l home > ./logs/lint-home.log 2>&1 ; echo $?)" > EC_LINT_HOME.var &
PID_LINT_HOME=$!
echo "Linting @fox/home"
echo "$(ng l processing > ./logs/lint-processing.log 2>&1 ; echo $?)" > EC_LINT_PROCESSING.var &
PID_LINT_PROCESSING=$!
echo "Linting @fox/processing"
echo "$(ng l quality-review > ./logs/lint-quality-review.log 2>&1 ; echo $?)" > EC_LINT_QUALITY_REVIEW.var &
PID_LINT_QUALITY_REVIEW=$!
echo "Linting @fox/quality-review"
echo "$(ng l check-recovery > ./logs/lint-check-recovery.log 2>&1 ; echo $?)" > EC_LINT_CHECK_RECOVERY.var &
PID_LINT_CHECK_RECOVERY=$!
echo "Linting @fox/check-recovery"
echo "$(ng l communication > ./logs/lint-communication.log 2>&1 ; echo $?)" > EC_LINT_COMMUNICATION.var &
PID_LINT_COMMUNICATION=$!
echo "Linting @fox/communication"
echo "$(ng l member-info > ./logs/lint-member-info.log 2>&1 ; echo $?)" > EC_LINT_MEMBER_INFO.var &
PID_LINT_MEMBER_INFO=$!
echo "Linting @fox/member-info"
echo "$(ng l shared > ./logs/lint-shared.log 2>&1 ; echo $?)" > EC_LINT_SHARED.var &
PID_LINT_SHARED=$!
echo "Linting @fox/shared"
echo "$(ng l fox-ui-client > ./logs/lint-fox-ui-client.log 2>&1 ; echo $?)" > EC_LINT_FOX_UI_CLIENT.var &
PID_LINT_FOX_UI_CLIENT=$!
echo "Linting fox-ui-client"
echo "$(ng l document-repository > ./logs/lint-document-repository.log 2>&1 ; echo $?)" > EC_LINT_DOCUMENT_REPOSITORY.var &
PID_LINT_DOCUMENT_REPOSITORY=$!
echo "Linting @fox/document-repository"
# - End Linting-

# - Build top project - state-management
echo "$(ng b state-management > ./logs/build-state-management.log 2>&1 ; echo $?)" > EC_BUILD_STATE_MANAGEMENT.var &
PID_BUILD_STATE_MANAGEMENT=$!
echo "Building @fox/state-management"

# Wait for the linting, then wait for the build
wait ${PID_LINT_STATE_MANAGEMENT} ${PID_LINT_REST_CLIENTS} ${PID_LINT_TEST_SUPPORT} ${PID_LINT_SHARED} ${PID_LINT_LOGIN} ${PID_LINT_FILE_MAINTENANCE} ${PID_LINT_CLAIM_PDF} ${PID_LINT_EOB_MATERIAL_PDF} ${PID_LINT_HOME} ${PID_LINT_FOX_UI_CLIENT} ${PID_LINT_PROCESSING} ${PID_LINT_QUALITY_REVIEW} ${PID_LINT_COMMUNICATION} ${PID_LINT_DOCUMENT_REPOSITORY} ${PID_LINT_MEMBER_INFO} ${PID_LINT_CHECK_RECOVERY}
EC_LINT_STATE_MANAGEMENT=$(cat EC_LINT_STATE_MANAGEMENT.var)
EC_LINT_REST_CLIENTS=$(cat EC_LINT_REST_CLIENTS.var)
EC_LINT_TEST_SUPPORT=$(cat EC_LINT_TEST_SUPPORT.var)
EC_LINT_SHARED=$(cat EC_LINT_SHARED.var)
EC_LINT_LOGIN=$(cat EC_LINT_LOGIN.var)
EC_LINT_FILE_MAINTENANCE=$(cat EC_LINT_FILE_MAINTENANCE.var)
EC_LINT_CLAIM_PDF=$(cat EC_LINT_CLAIM_PDF.var)
EC_LINT_EOB_MATERIAL_PDF=$(cat EC_LINT_EOB_MATERIAL_PDF.var)
EC_LINT_HOME=$(cat EC_LINT_HOME.var)
EC_LINT_PROCESSING=$(cat EC_LINT_PROCESSING.var)
EC_LINT_QUALITY_REVIEW=$(cat EC_LINT_QUALITY_REVIEW.var)
EC_LINT_FOX_UI_CLIENT=$(cat EC_LINT_FOX_UI_CLIENT.var)
EC_LINT_CHECK_RECOVERY=$(CAT EC_LINT_CHECK_RECOVERY.var)
EC_LINT_DOCUMENT_REPOSITORY=$(cat EC_LINT_DOCUMENT_REPOSITORY.var)
EC_LINT_COMMUNICATION=$(cat EC_LINT_COMMUNICATION.var)
EC_LINT_MEMBER_INFO=$(cat EC_LINT_MEMBER_INFO.var)

check_exit_code ${EC_LINT_STATE_MANAGEMENT} "lint" "state-management"
check_exit_code ${EC_LINT_REST_CLIENTS} "lint" "rest-clients"
check_exit_code ${EC_LINT_TEST_SUPPORT} "lint" "test-support"
check_exit_code ${EC_LINT_SHARED} "lint" "shared"
check_exit_code ${EC_LINT_LOGIN} "lint" "login"
check_exit_code ${EC_LINT_FILE_MAINTENANCE} "lint" "file-maintenance"
check_exit_code ${EC_LINT_CLAIM_PDF} "lint" "claim-pdf"
check_exit_code ${EC_LINT_EOB_MATERIAL_PDF} "lint" "eob-material-pdf"
check_exit_code ${EC_LINT_FOX_UI_CLIENT} "lint" "fox-ui-client"
check_exit_code ${EC_LINT_HOME} "lint" "home"
check_exit_code ${EC_LINT_PROCESSING} "lint" "processing"
check_exit_code ${EC_LINT_QUALITY_REVIEW} "lint" "quality-review"
check_exit_code ${EC_LINT_CHECK_RECOVERY} "lint" "check-recovery"
check_exit_code ${EC_LINT_COMMUNICATION} "lint" "communication"
check_exit_code ${EC_LINT_DOCUMENT_REPOSITORY} "lint" "document-repository"
check_exit_code ${EC_LINT_MEMBER_INFO} "lint" "member-info"

exit_on_job_failure \
  "${EC_LINT_STATE_MANAGEMENT} ${EC_LINT_REST_CLIENTS} ${EC_LINT_TEST_SUPPORT} ${EC_LINT_SHARED} ${EC_LINT_LOGIN} ${EC_LINT_FILE_MAINTENANCE} ${EC_LINT_EOB_MATERIAL_PDF} ${EC_LINT_FOX_UI_CLIENT} ${EC_LINT_HOME} ${EC_LINT_PROCESSING} ${EC_LINT_QUALITY_REVIEW} ${EC_LINT_COMMUNICATION} ${EC_LINT_DOCUMENT_REPOSITORY} ${EC_LINT_MEMBER_INFO} ${EC_LINT_CHECK_RECOVERY}" \
  "${PID_LINT_STATE_MANAGEMENT} ${PID_LINT_REST_CLIENTS} ${PID_LINT_TEST_SUPPORT} ${PID_LINT_SHARED} ${PID_LINT_LOGIN} ${PID_LINT_FILE_MAINTENANCE} ${PID_LINT_EOB_MATERIAL_PDF} ${PID_LINT_HOME} ${PID_LINT_FOX_UI_CLIENT} ${PID_BUILD_STATE_MANAGEMENT} ${PID_LINT_PROCESSING} ${PID_LINT_QUALITY_REVIEW} ${PID_LINT_COMMUNICATION} ${PID_LINT_DOCUMENT_REPOSITORY} ${PID_LINT_MEMBER_INFO} ${PID_LINT_CHECK_RECOVERY}"

wait ${PID_BUILD_STATE_MANAGEMENT}
EC_BUILD_STATE_MANAGEMENT=$(cat EC_LINT_STATE_MANAGEMENT.var)

check_exit_code ${EC_BUILD_STATE_MANAGEMENT} "build" "state-management"
exit_on_job_failure "${EC_BUILD_STATE_MANAGEMENT}" "${PID_BUILD_STATE_MANAGEMENT}"
# - End build top project -
# End Building Layer 1: No pre-requisites

# Building Layer 2: Requires state-management
echo "$(ng t state-management --passWithNoTests > ./logs/test-state-management.log 2>&1 ; echo $?)" > EC_TEST_STATE_MANAGEMENT.var &
PID_TEST_STATE_MANAGEMENT=$!
echo "Unit Testing @fox/state-management"

echo "$(ng b rest-clients > ./logs/build-rest-clients.log 2>&1 ; echo $?)" > EC_BUILD_REST_CLIENTS.var &
PID_BUILD_REST_CLIENTS=$!
echo "Building @fox/rest-clients"
wait ${PID_BUILD_REST_CLIENTS} ${PID_TEST_STATE_MANAGEMENT}
EC_BUILD_REST_CLIENTS=$(cat EC_LINT_REST_CLIENTS.var)
EC_TEST_STATE_MANAGEMENT=$(cat EC_TEST_STATE_MANAGEMENT.var)

check_exit_code ${EC_BUILD_REST_CLIENTS} "build" "rest-clients"
check_exit_code ${EC_TEST_STATE_MANAGEMENT} "test" "state-management"
exit_on_job_failure "${EC_BUILD_REST_CLIENTS} ${EC_TEST_STATE_MANAGEMENT}" "${PID_BUILD_REST_CLIENTS} ${PID_TEST_STATE_MANAGEMENT}"
## End Building Layer 2: Requires state-management

## Building Layer 3: Requires rest-clients
echo "$(ng t rest-clients --passWithNoTests > ./logs/test-rest-clients.log 2>&1 ; echo $?)" > EC_TEST_REST_CLIENTS.var &
PID_TEST_REST_CLIENTS=$!
echo "Unit Testing @fox/rest-clients"

echo "$(ng b test-support > ./logs/build-test-support.log 2>&1 ; echo $?)" > EC_BUILD_TEST_SUPPORT.var &
PID_BUILD_TEST_SUPPORT=$!
echo "Building @fox/test-support"
wait ${PID_BUILD_TEST_SUPPORT} ${PID_TEST_REST_CLIENTS}
EC_BUILD_TEST_SUPPORT=$(cat EC_LINT_TEST_SUPPORT.var)
EC_TEST_REST_CLIENTS=$(cat EC_TEST_REST_CLIENTS.var)

check_exit_code ${EC_BUILD_TEST_SUPPORT} "build" "test-support"
check_exit_code ${EC_TEST_REST_CLIENTS} "test" "rest-clients"
exit_on_job_failure "${EC_TEST_REST_CLIENTS} ${EC_BUILD_TEST_SUPPORT}" "${PID_TEST_REST_CLIENTS} ${PID_BUILD_TEST_SUPPORT}"
## End Building Layer 3: Requires rest-clients

## Building Layer 4: Requires test-support
echo "$(ng b shared > ./logs/build-shared.log 2>&1 ; echo $?)" > EC_BUILD_SHARED.var &
PID_BUILD_SHARED=$!
echo "Building @fox/shared"
wait ${PID_BUILD_SHARED}
EC_BUILD_SHARED=$(cat EC_BUILD_SHARED.var)

check_exit_code ${EC_BUILD_SHARED} "build" "shared"
exit_on_job_failure "${EC_BUILD_SHARED}" "${PID_BUILD_SHARED}"
# End Building Layer 4: Requires test-support

# Building Layer 5: Requires shared
echo "$(ng t shared --passWithNoTests > ./logs/test-shared.log 2>&1 ; echo $?)" > EC_TEST_SHARED.var &
PID_TEST_SHARED=$!
echo "Unit Testing @fox/shared"

echo "$(ng b login > ./logs/build-login.log 2>&1 ; echo $?)" > EC_BUILD_LOGIN.var &
PID_BUILD_LOGIN=$!
echo "Building @fox/login"
echo "$(ng b file-maintenance > ./logs/build-file-maintenance.log 2>&1 ; echo $?)" > EC_BUILD_FILE_MAINTENANCE.var &
PID_BUILD_FILE_MAINTENANCE=$!
echo "Building @fox/file-maintenance"
echo "$(ng b claim-pdf > ./logs/build-claim-pdf.log 2>&1 ; echo $?)" > EC_BUILD_CLAIM_PDF.var &
PID_BUILD_CLAIM_PDF=$!
echo "Building @fox/claim-pdf"
echo "$(ng b eob-material-pdf > ./logs/build-eob-material-pdf.log 2>&1 ; echo $?)" > EC_BUILD_EOB_MATERIAL_PDF.var &
PID_BUILD_EOB_MATERIAL_PDF=$!
echo "Building @fox/eob-material-pdf"
echo "$(ng b home > ./logs/build-home.log 2>&1 ; echo $?)" > EC_BUILD_HOME.var &
PID_BUILD_HOME=$!
echo "Building @fox/home"
echo "$(ng b processing > ./logs/build-processing.log 2>&1 ; echo $?)" > EC_BUILD_PROCESSING.var &
PID_BUILD_PROCESSING=$!
echo "Building @fox/processing"
echo "$(ng b communication > ./logs/build-communication.log 2>&1 ; echo $?)" > EC_BUILD_COMMUNICATION.var &
PID_BUILD_COMMUNICATION=$!
echo "Building @fox/communication"
echo "$(ng b member-info > ./logs/build-member-info.log 2>&1 ; echo $?)" > EC_BUILD_MEMBER_INFO.var &
PID_BUILD_MEMBER_INFO=$!
echo "Building @fox/member-info"
echo "$(ng b quality-review > ./logs/build-quality-review.log 2>&1 ; echo $?)" > EC_BUILD_QUALITY_REVIEW.var &
PID_BUILD_QUALITY_REVIEW=$!
echo "Building @fox/quality-review"
echo "$(ng b document-repository > ./logs/build-document-repository.log 2>&1 ; echo $?)" > EC_BUILD_DOCUMENT_REPOSITORY.var &
PID_BUILD_DOCUMENT_REPOSITORY=$!
echo "Building @fox/document-repository"
wait ${PID_BUILD_FILE_MAINTENANCE} ${PID_BUILD_DOCUMENT_REPOSITORY} ${PID_BUILD_LOGIN} ${PID_TEST_SHARED} ${PID_BUILD_CLAIM_PDF} ${PID_BUILD_EOB_MATERIAL_PDF} ${PID_BUILD_HOME} ${PID_BUILD_PROCESSING} ${PID_BUILD_QUALITY_REVIEW} ${PID_BUILD_COMMUNICATION} ${PID_BUILD_MEMBER_INFO}
EC_BUILD_LOGIN=$(cat EC_BUILD_LOGIN.var)
EC_BUILD_FILE_MAINTENANCE=$(cat EC_BUILD_FILE_MAINTENANCE.var)
EC_BUILD_CLAIM_PDF=$(cat EC_BUILD_CLAIM_PDF.var)
EC_TEST_SHARED=$(cat EC_TEST_SHARED.var)
EC_BUILD_EOB_MATERIAL_PDF=$(cat EC_BUILD_EOB_MATERIAL_PDF.var)
EC_BUILD_HOME=$(cat EC_BUILD_HOME.var)
EC_BUILD_PROCESSING=$(cat EC_BUILD_PROCESSING.var)
EC_BUILD_QUALITY_REVIEW=$(cat EC_BUILD_QUALITY_REVIEW.var)
EC_BUILD_DOCUMENT_REPOSITORY=$(cat EC_BUILD_DOCUMENT_REPOSITORY.var)
EC_BUILD_COMMUNICATION=$(cat EC_BUILD_COMMUNICATION.var)
EC_BUILD_MEMBER_INFO=$(cat EC_BUILD_MEMBER_INFO.var)

check_exit_code ${EC_BUILD_LOGIN} "build" "login"
check_exit_code ${EC_BUILD_FILE_MAINTENANCE} "build" "file-maintenance"
check_exit_code ${EC_BUILD_CLAIM_PDF} "build" "claim-pdf"
check_exit_code ${EC_TEST_SHARED} "test" "shared"
check_exit_code ${EC_BUILD_EOB_MATERIAL_PDF} "build" "eob-material-pdf"
check_exit_code ${EC_BUILD_HOME} "build" "home"
check_exit_code ${EC_BUILD_PROCESSING} "build" "processing"
check_exit_code ${EC_BUILD_QUALITY_REVIEW} "build" "quality-review"
check_exit_code ${EC_BUILD_DOCUMENT_REPOSITORY} "build" "document-repository"
check_exit_code ${EC_BUILD_COMMUNICATION} "build" "communication"
check_exit_code ${EC_BUILD_MEMBER_INFO} "build" "member-info"
exit_on_job_failure \
 "${EC_TEST_SHARED} ${EC_BUILD_LOGIN} ${EC_BUILD_FILE_MAINTENANCE} ${EC_BUILD_CLAIM_PDF} ${EC_BUILD_EOB_MATERIAL_PDF} ${EC_BUILD_HOME} ${EC_BUILD_PROCESSING} ${EC_BUILD_QUALITY_REVIEW} ${EC_BUILD_COMMUNICATION} ${EC_BUILD_DOCUMENT_REPOSITORY} ${EC_BUILD_MEMBER_INFO}" \
 "${PID_TEST_SHARED} ${PID_BUILD_LOGIN} ${PID_BUILD_FILE_MAINTENANCE} ${PID_BUILD_CLAIM_PDF} ${PID_BUILD_EOB_MATERIAL_PDF} ${PID_BUILD_HOME} ${PID_BUILD_PROCESSING} ${PID_BUILD_QUALITY_REVIEW} ${PID_BUILD_COMMUNICATION} ${PID_BUILD_DOCUMENT_REPOSITORY} ${PID_BUILD_MEMBER_INFO}"
## End Building Layer 5: Requires shared

echo "$(ng b check-recovery > ./logs/build-check-recovery.log 2>&1 ; echo $?)" > EC_BUILD_CHECK_RECOVERY.var &
PID_BUILD_CHECK_RECOVERY=$!
echo "Building @fox/check-recovery"

wait ${PID_BUILD_CHECK_RECOVERY}

EC_BUILD_CHECK_RECOVERY=$(cat EC_BUILD_CHECK_RECOVERY.var)

check_exit_code ${EC_BUILD_CHECK_RECOVERY} "build" "check-recovery"
exit_on_job_failure \
  "${EC_BUILD_CHECK_RECOVERY}" \
  "${PID_BUILD_CHECK_RECOVERY}"

## Building Layer 6: Requires feature modules
echo "$(ng t login --passWithNoTests > ./logs/test-login.log 2>&1 ; echo $?)" > EC_TEST_LOGIN.var &
PID_TEST_LOGIN=$!
echo "Unit Testing @fox/login"

echo "$(ng t file-maintenance --passWithNoTests > ./logs/test-file-maintenance.log 2>&1 ; echo $?)" > EC_TEST_FILE_MAINTENANCE.var &
PID_TEST_FILE_MAINTENANCE=$!
echo "Unit Testing @fox/file-maintenance"

echo "$(ng t document-repository --passWithNoTests > ./logs/test-document-repository.log 2>&1 ; echo $?)" > EC_TEST_DOCUMENT_REPOSITORY.var &
PID_TEST_DOCUMENT_REPOSITORY=$!
echo "Unit Testing @fox/document-repository"

echo "$(ng t claim-pdf --passWithNoTests > ./logs/test-claim-pdf.log 2>&1 ; echo $?)" > EC_TEST_CLAIM_PDF.var &
PID_TEST_CLAIM_PDF=$!
echo "Unit Testing @fox/claim-pdf"

echo "$(ng t eob-material-pdf --passWithNoTests > ./logs/test-eob-material-pdf.log 2>&1 ; echo $?)" > EC_TEST_EOB_MATERIAL_PDF.var &
PID_TEST_EOB_MATERIAL_PDF=$!
echo "Unit Testing @fox/eob-material-pdf"

echo "$(ng t home --passWithNoTests > ./logs/test-home.log 2>&1 ; echo $?)" > EC_TEST_HOME.var &
PID_TEST_HOME=$!
echo "Unit Testing @fox/home"

echo "$(ng t processing --passWithNoTests > ./logs/test-processing.log 2>&1 ; echo $?)" > EC_TEST_PROCESSING.var &
PID_TEST_PROCESSING=$!
echo "Unit Testing @fox/processing"

echo "$(ng t quality-review --passWithNoTests > ./logs/test-quality-review.log 2>&1 ; echo $?)" > EC_TEST_QUALITY_REVIEW.var &
PID_TEST_QUALITY_REVIEW=$!
echo "Unit Testing @fox/quality-review"

echo "$(ng t check-recovery --passWithNoTests > ./logs/test-check-recovery.log 2>&1 ; echo $?)" > EC_TEST_CHECK_RECOVERY.var &
PID_TEST_CHECK_RECOVERY=$!
echo "Unit Testing @fox/check-recovery"

echo "$(ng t communication --passWithNoTests > ./logs/test-communication.log 2>&1 ; echo $?)" > EC_TEST_COMMUNICATION.var &
PID_TEST_COMMUNICATION=$!
echo "Unit Testing @fox/communication"

echo "$(ng t member-info --passWithNoTests > ./logs/test-member-info.log 2>&1 ; echo $?)" > EC_TEST_MEMBER_INFO.var &
PID_TEST_MEMBER_INFO=$!
echo "Unit Testing @fox/member-info"

echo "$(ng t fox-ui-client --passWithNoTests > ./logs/test-fox-ui-client.log 2>&1 ; echo $?)" > EC_TEST_FOX_UI_CLIENT.var &
PID_TEST_FOX_UI_CLIENT=$!
echo "Unit Testing fox-ui-client"

echo "$(ng e --protractor-config protractor-mock.conf.js --configuration=mock --port 4299 > ./logs/e2e-fox-ui.log 2>&1 ; echo $?)" > EC_E2E_FOX_UI.var &
PID_E2E_FOX_UI=$!
echo "E2E Testing FOX UI"

echo "$(node --max-old-space-size=8192 ./node_modules/@angular/cli/bin/ng b --prod=true > ./logs/build-fox-ui-client.log 2>&1 ; echo $?)" > EC_BUILD_FOX_UI_CLIENT.var &
PID_BUILD_FOX_UI_CLIENT=$!
echo "Building fox-ui-client"
## End Building Layer 6: Requires feature modules

wait ${PID_TEST_FOX_UI_CLIENT} ${PID_TEST_LOGIN} ${PID_TEST_FILE_MAINTENANCE} ${PID_TEST_CLAIM_PDF} ${PID_TEST_HOME} ${PID_TEST_PROCESSING} ${PID_TEST_QUALITY_REVIEW} ${PID_TEST_DOCUMENT_REPOSITORY} ${PID_TEST_COMMUNICATION} ${PID_TEST_MEMBER_INFO} ${PID_TEST_CHECK_RECOVERY}
EC_TEST_FOX_UI_CLIENT=$(cat EC_TEST_FOX_UI_CLIENT.var)
EC_TEST_LOGIN=$(cat EC_TEST_LOGIN.var)
EC_TEST_FILE_MAINTENANCE=$(cat EC_TEST_FILE_MAINTENANCE.var)
EC_TEST_CLAIM_PDF=$(cat EC_TEST_CLAIM_PDF.var)
EC_TEST_EOB_MATERIAL_PDF=$(cat EC_TEST_EOB_MATERIAL_PDF.var)
EC_TEST_HOME=$(cat EC_TEST_HOME.var)
EC_TEST_PROCESSING=$(cat EC_TEST_PROCESSING.var)
EC_TEST_QUALITY_REVIEW=$(cat EC_TEST_QUALITY_REVIEW.var)
EC_TEST_CHECK_RECOVERY=$(cat EC_TEST_CHECK_RECOVERY.var)
EC_TEST_DOCUMENT_REPOSITORY=$(cat EC_TEST_DOCUMENT_REPOSITORY.var)
EC_TEST_COMMUNICATION=$(cat EC_TEST_COMMUNICATION.var)
EC_TEST_MEMBER_INFO=$(cat EC_TEST_MEMBER_INFO.var)

check_exit_code ${EC_TEST_LOGIN} "test" "login"
check_exit_code ${EC_TEST_FILE_MAINTENANCE} "test" "file-maintenance"
check_exit_code ${EC_TEST_CLAIM_PDF} "test" "claim-pdf"
check_exit_code ${EC_TEST_FOX_UI_CLIENT} "test" "fox-ui-client"
check_exit_code ${EC_TEST_EOB_MATERIAL_PDF} "test" "eob-material-pdf"
check_exit_code ${EC_TEST_HOME} "test" "home"
check_exit_code ${EC_TEST_PROCESSING} "test" "processing"
check_exit_code ${EC_TEST_QUALITY_REVIEW} "test" "quality-review"
check_exit_code ${EC_TEST_CHECK_RECOVERY} "test" "check-recovery"
check_exit_code ${EC_TEST_DOCUMENT_REPOSITORY} "test" "document-repository"
check_exit_code ${EC_TEST_COMMUNICATION} "test" "communication"
check_exit_code ${EC_TEST_MEMBER_INFO} "test" "member-info"
exit_on_job_failure \
 "${EC_TEST_LOGIN} ${EC_TEST_FILE_MAINTENANCE} ${EC_TEST_FOX_UI_CLIENT} ${EC_TEST_CLAIM_PDF} ${EC_TEST_EOB_MATERIAL_PDF} ${EC_TEST_HOME} ${EC_TEST_PROCESSING} ${EC_TEST_QUALITY_REVIEW} ${EC_TEST_DOCUMENT_REPOSITORY} ${EC_TEST_COMMUNICATION} ${EC_TEST_MEMBER_INFO} ${EC_TEST_CHECK_RECOVERY}" \
 "${PID_TEST_LOGIN} ${PID_TEST_FILE_MAINTENANCE} ${PID_TEST_FOX_UI_CLIENT} ${PID_TEST_CLAIM_PDF} ${PID_TEST_EOB_MATERIAL_PDF} ${PID_TEST_HOME} ${PID_TEST_PROCESSING} ${PID_TEST_QUALITY_REVIEW} ${PID_TEST_DOCUMENT_REPOSITORY} ${PID_TEST_COMMUNICATION} ${PID_TEST_MEMBER_INFO} ${PID_TEST_CHECK_RECOVERY}"

wait ${PID_E2E_FOX_UI}
EC_E2E_FOX_UI=$(cat EC_E2E_FOX_UI.var)

check_exit_code ${EC_E2E_FOX_UI} "e2e" "fox-ui"
exit_on_job_failure "${EC_E2E_FOX_UI}" "${PID_E2E_FOX_UI}"

echo "Waiting for completion"
wait ${PID_BUILD_FOX_UI_CLIENT}
EC_BUILD_FOX_UI_CLIENT=$(cat EC_BUILD_FOX_UI_CLIENT.var)

check_exit_code ${EC_BUILD_FOX_UI_CLIENT} "build" "fox-ui-client"
exit_on_job_failure "${EC_BUILD_FOX_UI_CLIENT}" "${PID_BUILD_FOX_UI_CLIENT}"

## Cleanup
rm EC_*.var

