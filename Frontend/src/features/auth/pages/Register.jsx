import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")

    const {loading,handleRegister} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (!username || !email || !password) {
            setErrorMessage("Please fill in all fields.")
            return
        }
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters.")
            return
        }

        try {
            await handleRegister({ username, email, password })
            navigate("/")
        } catch (err) {
            setErrorMessage(
                err?.response?.data?.message || "Something went wrong. Please try again."
            )
        }
    }

    return (
        <main className='auth-page'>
            <div className='auth-shell'>

                {/* ── Branding Panel ── */}
                <section className='auth-brand'>
                    <div className='auth-brand__logo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                        <span>InterviewAI</span>
                    </div>

                    <h1>Stop guessing what they'll <span>ask you</span>.</h1>
                    <p className='auth-brand__sub'>
                        Create a free account and turn any job description into a personalized
                        interview prep plan in under a minute.
                    </p>

                    <ul className='auth-brand__features'>
                        <li>
                            <span className='auth-brand__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <div>
                                <h3>Upload a resume or self-describe</h3>
                                <p>No polished resume? A quick self-description works just as well.</p>
                            </div>
                        </li>
                        <li>
                            <span className='auth-brand__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                            </span>
                            <div>
                                <h3>AI-generated Q&amp;A with model answers</h3>
                                <p>Not just questions — a sense of what interviewers are really testing for.</p>
                            </div>
                        </li>
                        <li>
                            <span className='auth-brand__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            </span>
                            <div>
                                <h3>Save and revisit your plans</h3>
                                <p>Every report is saved to your account, ready whenever you need it.</p>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* ── Form Panel ── */}
                <section className='auth-form-panel'>
                    <div className="form-container">
                        <div className='form-header'>
                            <h2>Create your account</h2>
                            <p>It's free — get your first interview prep plan in minutes.</p>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    type="text" id="username" name='username' placeholder='Enter username' />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email" id="email" name='email' placeholder='Enter email address' />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type="password" id="password" name='password' placeholder='Enter password' />
                            </div>

                            <button className='button primary-button' disabled={loading}>
                                {loading ? 'Creating account...' : 'Register'}
                            </button>

                        </form>

                        {errorMessage && <p className='form-error'>{errorMessage}</p>}
                        <p className='form-footer'>Already have an account? <Link to={"/login"} >Login</Link> </p>
                    </div>
                </section>

            </div>
        </main>
    )
}

export default Register