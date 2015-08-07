#GIT is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

```
$ git init
$ git status
$ git add <Filename>
$ git commit -m "Comment"
$ git add '*.txt'
$ git log
$ git remote add origin <https://github.com/...../.git>
$ git push -u origin master
$ git pull origin master
$ git diff HEAD
*The HEAD is a pointer that holds your position within all your different commits. By default HEAD points to your most recent commit, so it can be used as a quick way to reference that commit without having to look up the SHA.*

*Another great use for diff is looking at changes within files that have already been staged.*

$ git add octofamily/octodog.txt 
$ git diff --staged
$ git reset octofamily/octodog.txt //removing octodog.txt
$ git checkout -- octocat.txt
$ git branch <branch_name>
$ git checkout <branch_name>
$ git rm '*.txt' //remove all txt
$ git merge <branch_name>
$ git branch -d <branch name> //delete branch
$ git init && git add . && git commit -am 'initial commit'
```