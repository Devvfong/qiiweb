import dynamic from "next/dynamic";

const SignUpClient = dynamic(() => import("./_SignUpClient"), {
  ssr: false,
  loading: () => (
    <div style={{ background: "linear-gradient(135deg, #0f2027 0%, #2c5364 60%, #005c97 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "white", animation: "spin 0.7s linear infinite" }} />
    </div>
  ),
});

export default function SignUpPage() {
  return <SignUpClient />;
}
