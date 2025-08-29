const handleCaretToBack = (e) => {
  const val = e.target.value;
  e.target.setSelectionRange(val.length, val.length);
};

export default handleCaretToBack;
