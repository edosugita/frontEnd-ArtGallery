import Footer from "@/components/users/Footer"
import Navbar from "@/components/users/Navbar"
import style from '@/styles/Contact.module.css'
import { useEffect } from "react"

export default function Contact() {
  useEffect(() => {
    document.title = 'Art Galery'
  })

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div className="container p-5">
            <div className={style.contact}>
                <form>
                    <h3 className="mb-3 text-center">Contact Us</h3>
                    <div className={`mb-3`}>
                        <label htmlFor="email" className="form-label">EMAIL</label>
                        <input type="email" className={style.form_control} name='email' id="email" placeholder="email@email.com" />
                    </div>
                    <div className={`mb-3`}>
                        <label htmlFor="message" className="form-label">MESSSAGE</label>
                        <textarea className={style.form_control} id="message" rows="3" placeholder="Message"></textarea>
                    </div>
                    <div className={`mb-3`}>
                        <button type="submit" className="btn btn-danger w-100">Send</button>
                    </div>
                </form>
            </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}