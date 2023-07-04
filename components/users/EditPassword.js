import style from '@/styles/Modal.module.css'

export default function EditPassword() {
  return (
    <>
        <div className="modal fade" id="editPassword" tabIndex="-1" aria-labelledby="editUsernameLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className={style.modal_content}>
                    <div className={style.modal_header}>
                        <h1 className="modal-title fs-5" id="editUsernameLabel">Edit Password</h1>
                        <button type="button" className={style.btn_close} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className={`modal-body ${style.modal_body}`}>
                            <label htmlFor="old_password" className="form-label">OLD PASSWORD</label>
                            <input type="text" className={style.form_control} name='old_password' id="old_password" placeholder="************" />
                        </div>
                        <div className={`modal-body ${style.modal_body}`}>
                            <label htmlFor="new_password" className="form-label">NEW PASSWORD</label>
                            <input type="text" className={style.form_control} name='new_password' id="new_password" placeholder="************" />
                        </div>
                        <div className={`modal-body ${style.modal_body}`}>
                            <label htmlFor="con_password" className="form-label">CONFIRM PASSWORD</label>
                            <input type="text" className={style.form_control} name='con_password' id="con_password" placeholder="************" />
                        </div>
                        <div className={style.modal_footer}>
                            <button type="submit" className="btn btn-danger">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}
