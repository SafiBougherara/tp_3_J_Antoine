const express = require('express');
const router = express.Router();
const { Article, User } = require('../models');
const authenticateToken = require('../middlewares/auth');

// Get all articles (Public)
router.get('/', async (req, res) => {
    try {
        const articles = await Article.findAll({
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get one article (Public)
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }]
        });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create article (Private)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const article = await Article.create({
            title,
            content,
            userId: req.user.id
        });
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update article (Private)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        if (article.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

        await article.update({ title, content });
        res.json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete article (Private)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        if (article.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

        await article.destroy();
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
