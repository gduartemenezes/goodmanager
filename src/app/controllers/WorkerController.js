import * as Yup from 'yup';
import Worker from '../models/Worker';

class WorkerController {
  async store(req, res) {
    const schema = Yup.object.shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      birthDate: Yup.date().required(),
      admissionDate: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Data verification Failed, try again',
      });
    }

    const userExists = await Worker.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'Email already in use',
      });
    }

    const { id, name, email } = await Worker.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new WorkerController();
