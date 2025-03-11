import express from 'express';
import {
    createSubject,
    getSubjects,
    getSubject,
    deleteSubject,
    updateSubject,
    getAlumniBySubjectId
} from '../controllers/subject.controller';

const router = express.Router();

router.post('/', createSubject);
router.get('/', getSubjects);
router.get('/:id', getSubject);
router.delete('/:id', deleteSubject);
router.put('/:id', updateSubject);
router.get('/:id/alumni', getAlumniBySubjectId);

export default router;