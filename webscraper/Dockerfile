FROM node:20.10.0-alpine

RUN /bin/sh -c  "apk add --no-cache openssl ca-certificates && \
    openssl s_client -connect servicebus2.caixa.gov.br:443 -servername servicebus2.caixa.gov.br </dev/null | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > caixa_cert.crt && \
    mkdir -p /usr/local/share/ca-certificates && \
    cp caixa_cert.crt /usr/local/share/ca-certificates/ && \
    chmod 644 /usr/local/share/ca-certificates/caixa_cert.crt && \
    update-ca-certificates && \
    rm -rf caixa_cert.crt"