const router = require('express').Router();

const commentValidators = require('../validators/comment.validators')
const authMiddleware = require('../middlewares/auth.middleware');
const CommentsController = require('../controllers/comments.controller');

// Comentario por id
router.get('/:id', commentValidators.getCommentById, CommentsController.getCommentById);

// Darle like al comentario
router.post('/:id/like', commentValidators.likeComment, authMiddleware.isAuth, CommentsController.likeComment);

// Darle dislike al comentario
router.post('/:id/dislike', commentValidators.dislikeComment, authMiddleware.isAuth, CommentsController.dislikeComment);

// Actualizar un comentario
router.patch('/:id', commentValidators.updateComment, authMiddleware.isAuth, CommentsController.updateComment);

module.exports = router;