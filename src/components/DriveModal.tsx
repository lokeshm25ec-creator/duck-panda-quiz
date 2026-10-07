import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { googleSignIn, logout, getAccessToken } from '../services/auth';
import {
  saveReportToDrive,
  listReportsFromDrive,
  deleteReportFromDrive,
  DriveReportFile
} from '../services/driveService';
import { QuizScores, CoupleProfile, AnswerChoice, Question } from '../types';
import { soundEffects } from '../utils/soundEffects';
import {
  X,
  HardDrive,
  UploadCloud,
  FileText,
  ExternalLink,
  Trash2,
  AlertCircle,
  Loader2,
  CheckCircle2,
  LogOut,
  FolderHeart
} from 'lucide-react';

interface DriveModalProps {
  user: User | null;
  onUserChange: (user: User | null) => void;
  onClose: () => void;
  currentResult?: {
    scores: QuizScores;
    profile: CoupleProfile;
    answers: AnswerChoice[];
    questions: Question[];
  } | null;
}

export const DriveModal: React.FC<DriveModalProps> = ({
  user,
  onUserChange,
  onClose,
  currentResult
}) => {
  const [reports, setReports] = useState<DriveReportFile[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  // Confirmation dialog state for destructive file deletion (Mandatory requirement)
  const [fileToDelete, setFileToDelete] = useState<DriveReportFile | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Fetch reports when user is authenticated
  const loadReports = async () => {
    try {
      const token = await getAccessToken();
      if (!token) return;
      setLoadingList(true);
      setErrorMessage(null);
      const files = await listReportsFromDrive();
      setReports(files);
    } catch (err: any) {
      console.error('Failed to load reports from Drive:', err);
      setErrorMessage(err.message || 'Failed to load files from Google Drive');
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadReports();
    }
  }, [user]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMessage(null);
    try {
      soundEffects.playPop();
      const res = await googleSignIn();
      if (res) {
        onUserChange(res.user);
        soundEffects.playChime();
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setErrorMessage('Google sign in was cancelled or failed. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    soundEffects.playPop();
    await logout();
    onUserChange(null);
    setReports([]);
  };

  const handleSaveCurrentReport = async () => {
    if (!currentResult) return;
    setSaving(true);
    setErrorMessage(null);
    setSaveSuccess(null);
    try {
      soundEffects.playPop();
      const uploaded = await saveReportToDrive({
        scores: currentResult.scores,
        profile: currentResult.profile,
        answers: currentResult.answers,
        questions: currentResult.questions
      });
      setSaveSuccess(`Successfully saved "${uploaded.name}" to your Google Drive!`);
      soundEffects.playCelebration();
      await loadReports();
    } catch (err: any) {
      console.error('Save to Drive failed:', err);
      setErrorMessage(err.message || 'Could not save report to Google Drive');
    } finally {
      setSaving(false);
    }
  };

  // Explicit confirmation before deleting user file from Google Drive
  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;
    setDeleting(true);
    setErrorMessage(null);
    try {
      soundEffects.playPop();
      await deleteReportFromDrive(fileToDelete.id);
      setFileToDelete(null);
      await loadReports();
    } catch (err: any) {
      console.error('Delete failed:', err);
      setErrorMessage(err.message || 'Failed to delete report from Google Drive');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-[#2e1065] via-[#240c52] to-[#1a083d] rounded-3xl border border-purple-500/40 shadow-2xl flex flex-col overflow-hidden text-purple-100">
        {/* Header */}
        <div className="p-5 border-b border-purple-500/30 flex items-center justify-between bg-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bubble text-lg font-bold text-white flex items-center gap-2">
                <span>Google Drive Vault</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-pink-300 border border-purple-400/30">
                  🐼 &amp; 🦆
                </span>
              </h3>
              <p className="text-xs text-purple-300">
                Backup and view your couple quiz certificates in Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-purple-800/60 hover:bg-purple-700 text-purple-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Authentication State Card */}
          {!user ? (
            <div className="bg-purple-950/70 border border-purple-500/30 rounded-2xl p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-purple-900/80 border border-purple-500/40 flex items-center justify-center mx-auto text-2xl shadow-inner">
                📁
              </div>
              <div className="space-y-1">
                <h4 className="font-bubble text-lg font-bold text-white">
                  Connect Your Google Drive
                </h4>
                <p className="text-xs sm:text-sm text-purple-200/80 max-w-md mx-auto">
                  Sign in with Google to save your couple compatibility reports, keep permanent certificates, and access them from any device.
                </p>
              </div>

              {/* Official Google Sign In Button */}
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {isSigningIn ? (
                  <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Sign in with Google</span>
              </button>
            </div>
          ) : (
            <div className="bg-purple-950/70 border border-purple-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Google User'}
                    className="w-11 h-11 rounded-full border-2 border-pink-400 shadow"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold">
                    {user.email ? user.email[0].toUpperCase() : 'G'}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {user.displayName || 'Connected Account'}
                  </h4>
                  <p className="text-xs text-purple-300 font-mono">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-300 hover:text-white border border-purple-600/40 text-xs flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3 text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message */}
          {saveSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveSuccess}</span>
            </div>
          )}

          {/* Save Current Quiz Result Section */}
          {user && currentResult && (
            <div className="bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-pink-400/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 bg-pink-400/10 px-2 py-0.5 rounded-full inline-block mb-1">
                  Ready to Backup
                </span>
                <h4 className="font-bubble text-base font-bold text-white">
                  {currentResult.profile.title} ({currentResult.scores.cuteScore}% Cute)
                </h4>
                <p className="text-xs text-purple-200/80">
                  Save this complete quiz session and Vaathu&apos;s love notes to Google Drive.
                </p>
              </div>

              <button
                onClick={handleSaveCurrentReport}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UploadCloud className="w-4 h-4" />
                )}
                <span>{saving ? 'Saving to Drive...' : 'Save Report to Drive'}</span>
              </button>
            </div>
          )}

          {/* List of Saved Reports in Google Drive */}
          {user && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bubble text-sm font-bold text-white flex items-center gap-2">
                  <FolderHeart className="w-4 h-4 text-pink-400" />
                  <span>Saved Reports in Google Drive ({reports.length})</span>
                </h4>
                <button
                  onClick={loadReports}
                  disabled={loadingList}
                  className="text-xs text-purple-300 hover:text-white underline cursor-pointer"
                >
                  {loadingList ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              {loadingList ? (
                <div className="py-8 flex flex-col items-center justify-center text-purple-300 space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin text-pink-400" />
                  <p className="text-xs">Searching your Google Drive files...</p>
                </div>
              ) : reports.length === 0 ? (
                <div className="bg-purple-950/40 border border-purple-500/20 rounded-2xl p-6 text-center text-xs text-purple-300">
                  <p>No saved Panda &amp; Vaathu reports found yet.</p>
                  <p className="text-[11px] text-purple-400/70 mt-1">
                    Complete the quiz and click &ldquo;Save to Drive&rdquo; to store your first report!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {reports.map((file) => (
                    <div
                      key={file.id}
                      className="bg-purple-950/60 hover:bg-purple-900/50 border border-purple-500/20 rounded-xl p-3 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-300 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-white truncate">
                            {file.name.replace('.md', '').replace(/_/g, ' ')}
                          </p>
                          <p className="text-[10px] text-purple-300/70">
                            Saved {new Date(file.createdTime).toLocaleDateString()} at{' '}
                            {new Date(file.createdTime).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white transition-colors"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => setFileToDelete(file)}
                          className="p-2 rounded-lg bg-purple-900/80 hover:bg-rose-900/80 text-purple-300 hover:text-rose-200 transition-colors"
                          title="Delete from Google Drive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500/30 bg-purple-900/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
          >
            Close Vault
          </button>
        </div>
      </div>

      {/* MANDATORY USER CONFIRMATION MODAL FOR DELETING FILES IN DRIVE */}
      {fileToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-gradient-to-b from-[#2e1065] to-[#1a083d] rounded-2xl border border-rose-500/50 p-5 space-y-4 shadow-2xl text-purple-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bubble text-base font-bold text-white">
                  Delete File from Google Drive?
                </h4>
                <p className="text-xs text-rose-300">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-purple-200 bg-purple-950/60 p-3 rounded-xl border border-purple-500/20">
              Are you sure you want to permanently delete{' '}
              <span className="font-semibold text-white">&ldquo;{fileToDelete.name}&rdquo;</span> from your Google Drive?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setFileToDelete(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
              >
                {deleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>{deleting ? 'Deleting...' : 'Confirm & Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
