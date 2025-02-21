@echo off
for /f "tokens=*" %%i in ('where java') do (
    echo Java executable: %%i
    echo.
    for %%j in ("%%i\..\..\") do (
        echo JDK root directory: %%~dpj
    )
)
