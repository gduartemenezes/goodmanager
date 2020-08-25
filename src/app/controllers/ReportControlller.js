import * as Yup from 'yup';

import Report from '../models/Report';

class ReportController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      table: Yup.string().required(),
      column: Yup.string(),
      parameters: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Data Validation Failed',
      });
    }

    const report = await Report.create(req.body);

    return res.status(200).json({
      report,
    });
  }
}

export default new ReportController();
