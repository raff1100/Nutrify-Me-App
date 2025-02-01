import { Link } from "react-router-dom";

export default function Notfound() {
    return (
        <section className="container nf">
            <div className="not-found">
                <h1>404 | Not Found</h1>
                <p><Link to="/register">Register Now To Use!</Link></p>
            </div>
        </section>
    );
}
