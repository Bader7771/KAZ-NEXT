import './tokens.css';
import './StoryThread.css';

/**
 * Wrap the three story sections in this so a single hairline thread runs
 * behind all of them — the visual device that ties Problem&Solution,
 * How We Help You Grow, and How We Work into one continuous story
 * instead of three independent blocks.
 *
 * Usage:
 *   <StoryThread>
 *     <ProblemSolution />
 *     <hr className="kz-divider" />
 *     <HowWeHelp />
 *     <hr className="kz-divider" />
 *     <HowWeWork />
 *   </StoryThread>
 */
export default function StoryThread({ children }) {
  return (
    <div className="kz-thread-host">
      <div className="kz-thread" aria-hidden="true" />
      {children}
    </div>
  );
}
