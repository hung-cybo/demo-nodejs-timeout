const { KintoneRestAPIClient } = require("@kintone/rest-api-client");

(async () => {
    const APP_ID = "3";
    const ATTACHMENT_FIELD_CODE = "Attachment";
    const client = new KintoneRestAPIClient({
        baseUrl: "https://hung-dx-1.cybozu-dev.com",
        auth: {
            username: "cybozu",
            password: "cybozu"
        },
        proxy: {
            host: "dc-ty3-squid-1.cb.local",
            port: 3128,
        },
        socketTimeout: 1,
    });

    const FILE = { name: "Hello.txt", data: "abcdefg" };

    // Upload a file and attach it to a record
    try{
        const { fileKey } = await client.file.uploadFile({
            file: FILE,
        });
        const { id } = await client.record.addRecord({
            app: APP_ID,
            record: {
                [ATTACHMENT_FIELD_CODE]: {
                    value: [{ fileKey }],
                },
            },
        });
        console.log(KintoneRestAPIClient.version)
        console.log(id)
    }catch(err){
        console.log("err");
        // console.log(err);
    }
})();