import React, { useEffect } from 'react';
import { BriefcaseBusiness, Mail } from 'lucide-react';
interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    name: string;
    email: string;
    projectType: string;
    visionText: string;
  };
}
export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  if (!isOpen || !data) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="presentation">
      <button aria-label="Close project details" className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} />
      <article role="dialog" aria-modal="true" aria-labelledby="project-name" className="relative z-10 w-full max-w-[724px] rounded-[18px] bg-[#111111] p-5 shadow-2xl sm:p-7">
        <header>
          <h2 id="project-name" className="text-[29px] font-bold leading-tight tracking-[-0.04em] text-white">{data.name}</h2>
          <p className="mt-1 text-sm text-[#c6c6c6]">{data.projectType}</p>
        </header>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex min-h-[86px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#1a1a1a] p-3">
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl bg-[#073e59] text-[#42bafa]"><Mail aria-hidden="true" size={31} strokeWidth={1.7} /></div>
            <div className="min-w-0"><h3 className="text-base font-bold text-white">Email</h3><p className="mt-1 truncate text-sm text-white">{data.email}</p></div>
          </div>
          <div className="flex min-h-[86px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#1a1a1a] p-3">
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl bg-[#073e59] text-[#d6a84e]"><BriefcaseBusiness aria-hidden="true" size={29} strokeWidth={1.7} /></div>
            <div><h3 className="text-base font-bold text-white">Project type</h3><p className="mt-1 text-sm text-white">{data.projectType}</p></div>
          </div>
        </div>
        <section className="mt-11" aria-labelledby="vision-title">
          <h3 id="vision-title" className="text-center text-[26px] font-bold tracking-[-0.04em] text-white">Project vision</h3>
          <p className="mt-4 text-base leading-relaxed text-[#c8c8c8]">{data.visionText}</p>
        </section>
        <div className="mt-5"><button className="w-full rounded-full bg-[#0099FF] py-3.5 text-base font-bold text-white transition-colors hover:bg-[#0088ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" onClick={onClose}>Email this inquirer</button></div>
      </article>
    </div>;
};