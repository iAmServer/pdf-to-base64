const PdfMake = require('pdfmake/src/printer');
var {Base64Encode} = require('base64-stream');

var fonts = {
    Roboto: {
        normal: './fonts/Roboto-Regular.ttf',
		bold: './fonts/Roboto-Medium.ttf',
		italics: './fonts/Roboto-Italic.ttf',
		bolditalics: './fonts/Roboto-MediumItalic.ttf'
    }
};
    
var printer = new PdfMake(fonts);

const generate = async () => {
    return new Promise((resolve, reject) => {
        try{
            var dd = {
                content : [
                    'first Paragraph, I hope this give me the new content'
                    ,'and the second one'
                ]
            };
    
            var pdfKit = printer.createPdfKitDocument(dd);

            const stream = pdfKit.pipe(new Base64Encode({prefix:`data:application/pdf;base64,`}));

            let response = ''

            stream.on('data', data => response += data)
            stream.on('end', () => {
                return resolve({response});
            })

            pdfKit.end();
        }catch(e){
            return reject(e);
        }
    });
}

generate().then(e => {
    console.log(e);
}).catch(e => {
    console.log(e);
})