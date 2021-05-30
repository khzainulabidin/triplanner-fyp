const acceptedMimes = ['image/jpeg', 'image/png'];

exports.storage = {
    destination: (req, file, cb) => {
        cb(null, `./public/uploads/`)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname)
    }
};

exports.limits = {
    fileSize: 1024*1024,
    fileFilter: (req, file, cb) => {
        if (acceptedMimes.includes(file.mimetype)){
            cb(null, true);
        }
        else {
            cb(new Error('Invalid image type'), false);
        }
    }
}