@set NODE_PATH=D:\Node
@echo %PATH% | find "Node.js" 
@if %errorlevel% == 1 set PATH=%PATH%;%NODE_PATH% 
@rem @echo %cd% 
@npm start