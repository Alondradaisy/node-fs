const http = require("http");
const fs = require("fs");

function deleteAfter7(res) {
    setTimeout(() => {
        fs.rmdir('content', {recursive: true}, function (err) {
            if (err) {
                console.log("Something is wrong: ", err);
                // res.end("Something is wrong: ", err);
            } else {
                console.log("verbage.txt created")
                //res.end("verbage.txt created")
            }
        })
    });
}

http
.createServer(function (req, res) {
    if (req.url === "/create-directory" && req.method === "POST") {
        fs.mkdir("content", function (err) {
            if (err) {
                res.end("Sorry there is an error");
            } else {
                console.log("Content Folder created");
                res.end("Content-Folder-created");
            }
        });
    }
    if (req.url === "/create-text" && req.method === "POST") {
        let body = "";
        req.on("data", function (data) {
            body += data.toString();
        });
        req.on("end", function () {
            let parsedBody = JSON.parse(body);
            fs.writeFile(parsedBody.fileName, parsedBody.message, function (err) {
                if (err) {
                    res.end("Sorry there is an error: ", err);
                } else {
                    console.log(`${parsedBody.fileName} created`);
                    res.end(`${parsedBody.fileName} created`);
                }
            });
        });
    }
    if (req.url === "/new-folder-and-file" && req.method === "POST") {
        let body = "";

        req.on("data", function (data) {
            body += data.toString();
        });

        req.on("end", function () {
            //let parsedBody = JSON.parse(body);
            console.log(41)
            fs.writeFile("content/verbage.txt", "hardcoded text!", function (err){
                if (err) {
                    res.end("Sorry there's an error: ", err);
                } else {
                    deleteAfter7(res);
                    console.log("verbage.txt created");
                    res.end("verbage.txt created");
                }
            })
        })
    }
})
.listen(3000, function () {
    console.log(`Server started at port 3000`);
});
