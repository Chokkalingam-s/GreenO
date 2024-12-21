export default function RoleButton({ role, selectedRole, setRole, label }) {
  return (
    <button
      type='button'
      onClick={() => setRole(role)}
      className={`text-lg my-0 transition-opacity opacity-100 hover:bg-secondary ${
        selectedRole === role
          ? `bg-secondary opacity-100`
          : `bg-transparent opacity-40`
      }`}>
      {label}
    </button>
  )
}
