import Link from 'next/link';
// Default page under localhost:3000/examplePage
export default function ExamplePage() {
    return (React.createElement(React.Fragment, null,
        React.createElement("main", { className: 'flex min-h-screen flex-col items-center justify-center' },
            React.createElement("p", { className: 'rounded-xl border border-slate-500 bg-gradient-to-b from-zinc-800/30 to-zinc-500/40 p-4' }, "Example Page"),
            React.createElement(Link, { href: '/' },
                React.createElement("div", { className: 'mt-3 rounded-xl border border-slate-500 bg-gradient-to-b p-3 hover:from-zinc-800/40 hover:to-zinc-500/50' }, "Return to Home")))));
}
