import * as Yup from 'yup';
import Worker from '../models/Worker';

class SessionController {
  async store(req, res) {
    const schema = Yup.object.shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Data verification Failed, try again.',
      });
    }

    const user = await Worker.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(400).json({
        error: 'This email does not exist in our database.',
      });
    }

    if (!(await user.checkPassword(req.body.password))) {
      return res.status(400).json({
        error: 'Password does not match.',
      });
    }

    const { id, name } = user;

    return res.status(200).json({
      user: {
        id,
        name,
      },
    });
  }
}

export default new SessionController();
