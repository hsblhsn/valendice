FROM node:17 AS frontend
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY Makefile /app/Makefile
RUN make dependencies
COPY . .
RUN make build


FROM golang:1.17.6-bullseye AS server
WORKDIR /source
RUN useradd -u 10001 scratchuser
COPY server .
RUN CGO_ENABLED=0 go build -ldflags="-extldflags=-static" -trimpath -o /service . 


FROM scratch
COPY --from=server /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=server /etc/passwd /etc/passwd
COPY --from=server /service /service
COPY --from=frontend /app/dist /public
USER scratchuser
ENTRYPOINT ["/service"]


