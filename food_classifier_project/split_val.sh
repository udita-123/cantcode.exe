for c in rice curry bread fruits "packaged food" other; do
  mkdir -p "data/val/$c"
  count=0
  for f in "data/train/$c/"*; do
    [ -f "$f" ] || continue
    mv "$f" "data/val/$c/"
    count=$((count+1))
    [ $count -ge 5 ] && break 
  done
  echo "Moved $count files -> $c"
done

