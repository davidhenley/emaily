function localtunnel {
  lt -s featureddrinkemaily --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
