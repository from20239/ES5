import { ISubject, SubjectModel } from '../models/subject';
import { Types } from 'mongoose';

export class SubjectService {
    // 创建新科目
    async createSubject(subject: Partial<ISubject>): Promise<ISubject | null> {
        const newSubject = new SubjectModel(subject);
        return await newSubject.save();
    }

    // 获取所有科目
    async getSubjects(): Promise<ISubject[]> {
        return await SubjectModel.find().populate('alumni');
    }

    // 根据ID获取科目
    async getSubjectById(id: string): Promise<ISubject | null> {
        return await SubjectModel.findById(id).populate('alumni');
    }

    // 根据ID删除科目
    async deleteSubjectById(id: string): Promise<ISubject | null> {
        return await SubjectModel.findByIdAndRemove(id);
    }

    // 根据ID更新科目
    async updateSubjectById(id: string, data: Partial<ISubject>): Promise<ISubject | null> {
        return await SubjectModel.findByIdAndUpdate(id, data, { new: true });
    }

    // 获取所有选修该科目的学生
    async getAlumniBySubjectId(id: string): Promise<Types.ObjectId[] | null> {
        const subject = await SubjectModel.findById(id).populate('alumni');
        return subject ? subject.alumni : null;
    }
}