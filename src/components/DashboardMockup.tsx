import { motion } from 'framer-motion'

const bars = [72, 48, 86, 64, 91, 58, 76]

export function DashboardMockup() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/75 p-4 shadow-2xl shadow-teal-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:shadow-black/30"
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
    >
      <div className="relative rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-white dark:border-white/10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400">Enterprise dashboard</p>
            <h3 className="mt-1 text-lg font-semibold">Resource Analytics</h3>
          </div>
          <div className="rounded-lg bg-teal-400/15 px-3 py-2 text-sm font-semibold text-teal-200">
            98.7%
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {['Inventory', 'Reports', 'Users'].map((label, index) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-zinc-400">{label}</p>
              <p className="mt-2 text-xl font-semibold">{[1248, 86, 342][index]}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">PostgreSQL workload</p>
            <span className="text-xs text-zinc-400">Live</span>
          </div>
          <div className="flex h-36 items-end gap-2">
            {bars.map((height, index) => (
              <motion.div
                key={height}
                className="flex-1 rounded-t-md bg-gradient-to-t from-teal-500 to-sky-300"
                initial={{ height: 16 }}
                animate={{ height: `${height}%` }}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + index * 0.08,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  repeatDelay: 2.5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {['REST API latency: 84ms', 'Queue jobs healthy', 'Role access secured', 'Charts synced'].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
