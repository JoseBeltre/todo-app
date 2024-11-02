export function ExpandIcon ({ expand, color }) {
  if (expand) {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill={color}><path d='M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z' /></svg>
    )
  } else {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill={color}><path d='M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z' /></svg>
    )
  }
}
