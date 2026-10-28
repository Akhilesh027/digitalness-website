import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
export default function NotFound(){return <><Seo title="Page not found"/><section className="page-hero full"><div className="container narrow"><span className="eyebrow">404</span><h1>This route does not exist.</h1><p>The page may have moved or the URL may be incorrect.</p><Link className="btn btn-primary" to="/">Return home</Link></div></section></>}
