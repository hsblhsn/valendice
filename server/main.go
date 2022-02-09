package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

var directory = "./public"

func init() {
	if dir := os.Getenv("SERVE_DIR"); dir != "" {
		directory = dir
	}
	if _, err := os.Stat(directory); os.IsNotExist(err) {
		log.Fatalf("Directory %s does not exist", directory)
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if len(os.Args) >= 2 && os.Args[1] == "dryrun" {
		log.Println("ok")
		return
	}
	http.HandleFunc("/", serveFiles)
	log.Printf("Serving %s on HTTP port: %s\n", directory, port)
	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, nil))
}

func serveFiles(w http.ResponseWriter, r *http.Request) {
	p := filepath.Join(directory, r.URL.Path)
	if f, err := os.Stat(p); p == directory || err != nil || f.IsDir() {
		p = directory
	}
	http.ServeFile(w, r, p)
}
