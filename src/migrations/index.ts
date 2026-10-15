import * as migration_20261014_065425_initial_platform from './20261014_065425_initial_platform';
import * as migration_20261014_180000_handoff_sections from './20261014_180000_handoff_sections';
import * as migration_20261015_164935 from './20261015_164935';

export const migrations = [
  {
    up: migration_20261014_065425_initial_platform.up,
    down: migration_20261014_065425_initial_platform.down,
    name: '20261014_065425_initial_platform',
  },
  {
    up: migration_20261014_180000_handoff_sections.up,
    down: migration_20261014_180000_handoff_sections.down,
    name: '20261014_180000_handoff_sections',
  },
  {
    up: migration_20261015_164935.up,
    down: migration_20261015_164935.down,
    name: '20261015_164935'
  },
];
