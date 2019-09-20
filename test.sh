STATUS=$(curl -s -o /dev/null -w '%{http_code}' -d '{"email":"value", "name":"value1", "content":"value22"}' -H "Content-Type: application/json" -X POST $1/example-path)

if [ $STATUS -eq 202 ]; then
  echo "POST    /example-path....... 202 Accepted\t\tSUCCESS!"
  break
else
  echo "Got $STATUS :( Not done yet..."
fi

