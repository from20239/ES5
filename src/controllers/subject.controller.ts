import { Request, Response } from 'express';
import { SubjectService } from '../services/subject';
import { ISubject } from '../models/subject';

const subjectService = new SubjectService();

// 创建新科目
export async function createSubject(req: Request, res: Response): Promise<Response> {
    try {
        const { name, teacher, alumni } = req.body as ISubject;
        const newSubject: Partial<ISubject> = { name, teacher, alumni };

        const subject = await subjectService.createSubject(newSubject);
        return res.json({
            message: "Subject created",
            subject
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create subject' });
    }
}

// 获取所有科目
export async function getSubjects(req: Request, res: Response): Promise<Response> {
    try {
        const subjects = await subjectService.getSubjects();
        return res.json(subjects);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get subjects' });
    }
}

// 根据ID获取科目
export async function getSubject(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const subject = await subjectService.getSubjectById(id);

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        return res.json(subject);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get subject' });
    }
}

// 根据ID删除科目
export async function deleteSubject(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const subject = await subjectService.deleteSubjectById(id);

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        return res.json({
            message: "Subject deleted",
            subject
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete subject' });
    }
}

// 根据ID更新科目
export async function updateSubject(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const { name, teacher, alumni } = req.body as ISubject;
        const updatedSubject: Partial<ISubject> = { name, teacher, alumni };

        const subject = await subjectService.updateSubjectById(id, updatedSubject);

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        return res.json({
            message: "Subject updated",
            subject
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update subject' });
    }
}

// 获取所有选修该科目的学生
export async function getAlumniBySubjectId(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const alumni = await subjectService.getAlumniBySubjectId(id);

        if (!alumni) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        return res.json(alumni);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get alumni' });
    }
}