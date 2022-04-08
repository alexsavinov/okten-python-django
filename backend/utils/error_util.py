from rest_framework.response import Response
from rest_framework.views import exception_handler

from enums.error_enum import ErrorEnum


def custom_error_handler(exc: Exception, content) -> Response:
    handlers = {
        'JwtException': _jwt_validate_error
    }
    exc_class = exc.__class__.__name__
    if exc_class in handlers:
        function = handlers[exc_class]
        return function(exc, content)
    response = exception_handler(exc, content)
    return response


def _jwt_validate_error(exc: Exception, content: dict) -> Response:
    print(exc)
    print(content)
    return Response(ErrorEnum.JWT.msg, ErrorEnum.JWT.code)
