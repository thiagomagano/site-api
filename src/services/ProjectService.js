import Project from "../models/Project.js";

class ProjectService {
  async findAll() {
    return Project.find();
  }

  async findById(id) {
    return Project.findById(id);
  }

  async create(data) {
    return Project.create(data);
  }

  async update(id, data) {
    return Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return Project.findByIdAndDelete(id);
  }
}

export default new ProjectService();