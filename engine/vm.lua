-- Lua Obf — VM runtime.
-- This file is embedded into the obfuscated output when preset.useVM is on.
-- It provides a minimal bytecode interpreter that the wrapper loads.
--
-- NOTE: this is a stub. A full VM requires a bytecode compiler, which is
-- beyond what client-side JS can do well. The wrapper currently falls back
-- to multi-layer loadstring wrapping when useVM is true.

local VM = {}

-- Opcode set (unused in current implementation, kept for future)
VM.OPS = {
  NOP  = 0,
  LOAD = 1,  -- LOAD R[a], K[b]       -- load constant into register
  MOVE = 2,  -- MOVE R[a], R[b]       -- copy register
  ADD  = 3,  -- ADD R[a], R[b], R[c]  -- arithmetic
  SUB  = 4,
  MUL  = 5,
  DIV  = 6,
  CALL = 7,  -- CALL R[a], R[b], n    -- call function in R[a] with args R[b..b+n]
  RET  = 8,  -- RET R[a]              -- return
  JMP  = 9,  -- JMP a                 -- jump to address
  JEQ  = 10, -- JEQ R[a], R[b], addr  -- jump if equal
  JNE  = 11,
  GETG = 12, -- GETG R[a], K[b]       -- get global
  SETG = 13, -- SETG K[a], R[b]       -- set global
  GETT = 14, -- GETT R[a], R[b], K[c] -- get table field
  SETT = 15, -- SETT R[a], K[b], R[c] -- set table field
}

-- Interpreter stub — the real implementation is left to the wrapper's
-- loadstring layers. This file exists so that the obfuscated output has
-- a stable runtime contract if a full VM is added later.

function VM.run(bytecode, constants, globals)
  error('[lua-obf] VM not fully implemented in this build. Use wrapper fallback.')
end

return VM