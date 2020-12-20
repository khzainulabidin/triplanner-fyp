// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = (req, res, next) => {
    res.status(200).send('Get all users');
}

// @desc    Get a user
// @route   GET /api/v1/users/:id
// @access  Public
exports.getUser = (req, res, next) => {
    res.status(200).send('Get a user');
}

// @desc    Create a user
// @route   POST /api/v1/users
// @access  Private
exports.createUser = (req, res, next) => {
    res.status(200).send('Create a user');
}

// @desc    Update a user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = (req, res, next) => {
    res.status(200).send('Update a user');
}

// @desc    Delete a users
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser = (req, res, next) => {
    res.status(200).send('Delete a user');
}