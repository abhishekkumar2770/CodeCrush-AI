const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content px-6 py-12 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* LEFT - About Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-primary mb-2">CodeCrush AI</h2>
          <p className="text-sm leading-relaxed opacity-90 max-w-md">
            CodeCrush AI is a platform built for developers to connect,
            collaborate, and build side projects together. Whether you're
            looking for a co-founder, mentor, or teammate — this is your space.
          </p>
          <p className="text-xs opacity-60 pt-6">
            © {new Date().getFullYear()} CodeCrush AI. Built with 💙 for
            developers.
          </p>
        </div>

        {/* RIGHT - Contact Section */}
        <div className="flex-1 text-sm space-y-4 md:text-right">
          <h2 className="text-xl font-semibold text-primary">
            Connect With Us
          </h2>

          <ul className="space-y-2">
            <li className="flex items-center gap-2 md:justify-end">
              <span>📩</span>
              <span>
                <span className="opacity-80">Email:</span>{" "}
                <span className="text-blue-400">abhishek.kumar.2027.in@gmail.com</span>
              </span>
            </li>
            <li className="flex items-center gap-2 md:justify-end">
              <span>🔗</span>
              <span>
                <span className="opacity-80">LinkedIn:</span>{" "}
                <a
                  href="https://www.linkedin.com/in/abhishek-kumar-b5a99327b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Abhishek Kumar
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2 md:justify-end">
              <span>📸</span>
              <span>
                <span className="opacity-80">Instagram:</span>{" "}
                <span className="text-blue-400">@codecrushai (coming soon)</span>
              </span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex md:justify-end gap-5 pt-3">
            {/* GitHub */}
            <a
              href="https://github.com/abhishekkumar2770"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6 fill-current hover:text-primary transition"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.385.6.113.793-.26.793-.577 
                         0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757
                         -1.09-.744.083-.729.083-.729 1.206.085 1.84 1.236 1.84 1.236 1.07 1.835 2.806 1.305 3.492.998
                         .107-.776.42-1.305.763-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.235-3.22
                         -.123-.305-.535-1.527.117-3.182 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.403
                         1.02.005 2.047.137 3.006.403 2.29-1.552 3.295-1.23 3.295-1.23.653 1.655.24 2.877.118 3.182
                         .77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.625-5.475 5.922.43.372.816 1.104.816 2.225
                         0 1.606-.015 2.898-.015 3.293 0 .318.192.694.8.576C20.565 21.796 24 17.3 24 12
                         c0-6.63-5.373-12-12-12z"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/abhishek-kumar-b5a99327b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6 fill-current hover:text-primary transition"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 
                         5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75
                         s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604
                         c0-1.336-.026-3.06-1.865-3.06-1.865 0-2.152 1.458-2.152 2.965v5.699h-3v-10h2.879v1.365
                         h.042c.401-.759 1.379-1.56 2.839-1.56 3.038 0 3.597 2 3.597 4.604v5.591z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
