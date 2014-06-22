HEADER_SRC = img/source
HEADER_DST = img/header

headers:
		@mogrify -resize 1600x \
			-background white \
			-gravity center \
			-extent 1600x480 \
			-format jpg \
			-quality 75 \
			-path $(HEADER_DST) \
			$(HEADER_SRC)/*



test: headers

.PHONY: test

