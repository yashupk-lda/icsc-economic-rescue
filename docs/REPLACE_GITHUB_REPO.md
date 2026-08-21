# Replace the current GitHub repository contents

Do **not** delete the GitHub repository itself. Keeping the repository preserves its URL and usually keeps the existing Cloudflare Pages Git connection intact.

## Safest Windows / VS Code workflow

1. Download and extract `economics-rescue-optimized.zip`.
2. Open your existing GitHub repository folder in VS Code.
3. Open Terminal in VS Code and run:

```powershell
git status
git branch backup-before-refactor
git push -u origin backup-before-refactor
```

The backup branch gives you a one-command escape hatch if anything was missed.

4. Return to your normal deployment branch, usually `main`:

```powershell
git switch main
```

5. Remove the old **tracked** project files without touching the `.git` folder:

```powershell
git rm -r .
```

6. Copy the **contents** of the extracted `economics-rescue-optimized` folder into the repository root. The root should contain `index.html`, `mission.html`, `menu.html`, `assets/`, `missions/`, etc. Do not create an extra nested `economics-rescue-optimized/` directory inside the repo.

7. Check what Git sees:

```powershell
git status
```

8. Commit and push:

```powershell
git add .
git commit -m "Refactor Economics Rescue into responsive mission engine"
git push origin main
```

9. Cloudflare Pages should deploy from the same connected repository/branch. If the old site used no build command, keep it that way. The publish directory should remain the repository root.

## If you have old untracked files

`git rm -r .` only removes files Git already tracks. If `git status` shows old untracked files afterward, review them and delete only the ones you know are obsolete. Do not run a blanket destructive clean command unless you are certain there is nothing local you need.

## Roll back if needed

Your old project is preserved on `backup-before-refactor`. You can inspect it on GitHub or restore from it later.
