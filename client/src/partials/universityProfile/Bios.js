import React, { useState, useEffect } from "react";
// ** styles
import "../../assets/styles/UniversityProfileTab.css";
import QuellTextEditor from "../../components/TextEditorQuill/TextEditorQuill";
import { useDispatch } from "react-redux";
import { UpdateInfoUniv } from "../../redux/university/university.actions";
import { useTranslation } from "react-i18next";
// ** ==>
function Bios({ univ }) {
  const [form, setForm] = useState({ description: "", long_desc: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    const { description, long_desc } = univ;
    setForm({ description, long_desc });
  }, [univ]);

  const handle_change = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const { nom, fullname, tel, OrganMere, address, pays } = univ;
    let old_data = { nom, fullname, tel, OrganMere, address, pays };
    dispatch(UpdateInfoUniv(univ.id, { ...old_data, ...form }, () => {}));
  };

  const {t} = useTranslation();

  return (
    <div>
      <div>
        <p className="section_title_style text-capitalize title_second pt-3 mt-5">
          {t('uni_params.bio')} <span className="color_second">*</span>
        </p>
        <textarea
          className="bios_container w-100 bios_height"
          rows={10}
          value={form.description}
          name="description"
          onChange={handle_change}
        />
      </div>

      <div>
        <p className="section_title_style text-capitalize title_second pt-3 mt-5">
        {t('uni_params.long_description')}<span className="color_second">*</span>
        </p>
        <QuellTextEditor
          style={{ height: "400px" }}
          name="long_desc"
          value={form.long_desc}
          placeholder="Long Description about the university"
          onChange={handle_change}
        />
      </div>
      <button
        className="btn main_btn w-100 signup_btn title_second my-3"
        onClick={handleSubmit}
      >
        {t('user.change_bio')}
      </button>
    </div>
  );
}

export default Bios;
