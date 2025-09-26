package com.devforgely.userhubbackend.common;

public enum ErrorCode {

    SUCCESS(0, "ok", ""),
    PARAMS_ERROR(40000, "Parameter error", ""),
    NULL_ERROR(40001, "Null parameters", ""),
    NOT_LOGIN(40100, "Not login", ""),
    NO_AUTH(40101, "Not authenticated", ""),
    SYSTEM_ERROR(50000, "System error", "");

    private final int code;

    private final String message;

    private final String description;

    ErrorCode(int code, String message, String description) {
        this.code = code;
        this.message = message;
        this.description = description;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getDescription() {
        return description;
    }
}
