curl http://www.celestrak.com/NORAD/elements/iridium-33-debris.txt > iridium-33-debris.txt
curl http://www.celestrak.com/NORAD/elements/cosmos-2251-debris.txt > cosmos-2251-debris.txt
cat iridium-33-debris.txt cosmos-2251-debris.txt > debris.txt
rm iridium-33-debris.txt cosmos-2251-debris.txt 

sed -i '' -e '$ d' README.md
echo "Orbital data collected "(date "+%Y-%m-%d %H:%M:%S PDT") >> README.md
