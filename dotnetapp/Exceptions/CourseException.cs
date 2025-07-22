using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Exceptions
{
    public class CourseException: Exception
    {
        public CourseException()
        {

        }
        public CourseException(string Message):base(Message)
        {

        }

        public CourseException(string Message, Exception innerException):base(Message, innerException)
        {

        }
    }
}