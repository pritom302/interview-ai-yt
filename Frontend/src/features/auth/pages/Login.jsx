import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (!email || !password) {
            setErrorMessage("Please enter both email and password.")
            return
        }

        try {
            await handleLogin({ email, password })
            navigate('/')
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

                    <h1>Walk into your next interview <span>already prepared</span>.</h1>
                    <p className='auth-brand__sub'>
                        Paste a job description, add your resume, and get a personalized prep plan built
                        for that exact role — not generic advice.
                    </p>

                    <ul className='auth-brand__features'>
                        <li>
                            <span className='auth-brand__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                            </span>
                            <div>
                                <h3>Role-specific questions</h3>
                                <p>Technical and behavioral questions generated from the actual job posting.</p>
                            </div>
                        </li>
                        <li>
                            <span className='auth-brand__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <div>
                                <h3>Match score & skill gaps</h3>
                                <p>See exactly how your profile stacks up against the role before you apply.</p>
                            </div>
                        </li>
                        <li>
                            <span className='auth-brand__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                            </span>
                            <div>
                                <h3>Day-by-day prep roadmap</h3>
                                <p>A structured study plan so you know what to focus on, and when.</p>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* ── Form Panel ── */}
                <section className='auth-form-panel'>
                    <div className="form-container">
                        <div className='form-header'>
                            <h2>Welcome back</h2>
                            <p>Log in to continue preparing for your next interview.</p>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                            {errorMessage && <p className='form-error'>{errorMessage}</p>}
                            <button className='button primary-button' disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <p className='form-footer'>Don't have an account? <Link to={"/register"} >Register</Link> </p>
                    </div>
                </section>

            </div>
        </main>
    )
}

export default Login