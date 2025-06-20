import express from 'express';
import { generateValidation } from '../validations/GenerateValidation.js';
import { CombinationService } from '../services/CombinationService.js';

const routes = express.Router();

routes.post('/', async (req, res) => {
    
    try {
        const { error, value } = generateValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const { items, length } = value;
        const service = new CombinationService(items, length);
        const result = await service.executeTransaction();
        return res.status(201).json(result);
    } catch (error) {
        const status = error.response ? error.response.status : 400;
        return res.status(status).json({ message: error.message });
    }
});

export default routes;